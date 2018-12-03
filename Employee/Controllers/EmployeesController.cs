using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Employee.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Collections;
using Microsoft.Extensions.Primitives;

namespace Employee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;
        public EmployeesController(ApplicationDbContext context, IHostingEnvironment he )
        {
            _context = context;
            _hostingEnvironment=he;
        }

        // GET: api/Employees
        [HttpGet]
        public  IEnumerable<Employee.Models.Employee> GetEmployees()
        {
            return  _context.Employees;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee([FromRoute] int id, bool emergencyContac =false)   
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Employee.Models.Employee employee;
            if (emergencyContac)
            {
                employee = await _context.Employees.Include(x=>x.EmergenceContacts).SingleOrDefaultAsync(m=>m.Id==id);
            }
            else
            {
                employee = await _context.Employees.FindAsync(id);
              
            }
            //EmergencyContact emc;
             //employee = await _context.Employees.Include(x => x.EmergenceContacts).SingleOrDefaultAsync(m => m.Id == id);
            //emc = employee.EmergenceContacts.FirstOrDefault();

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPost("search")]
        public IEnumerable search([FromForm] string  firstName)
        {
           return  _context.Employees.Where(x=>x.firstName.StartsWith(firstName)).ToList();
           
        }

        /*StringValues firstName;
        HttpContext.Request.Form.TryGetValue("firstName", out firstName);
        //return   _context.Employees.Where(x => x.firstName.StartsWith(firstName)).ToList();
        return _context.Employees.Where(x => x.firstName.StartsWith(firstName)).ToList();
        */
        //}
        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee([FromRoute] int id, IFormFile image, [FromForm] Employee.Models.Employee employee)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.Id)
            {
                return BadRequest();
            }

            if (image != null)
            {
                employee.img = await convertImg(image);
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
       [HttpPost]
        public async Task<IActionResult> PostEmployee(IFormFile image, [FromForm] Models.Employee employee)
        {
            if (image !=null)
                employee.img = await convertImg(image);
            else
                employee.img = null;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }
        //----
        //[HttpPost("img")]
        //public  IActionResult getImg([FromBody] int id)
        //{
        //    Employee.Models.Employee employee;
        //    employee =  _context.Employees.Find(id);
        //    var file1 = new FileInfo(employee.img); 
        //    string g = Path.GetFileName(file1.FullName);
        //    byte[] bytes;
        //    using (FileStream file = new FileStream(employee.img, FileMode.Open, FileAccess.Read))
        //    {
        //        bytes = new byte[file.Length];
        //        file.Read(bytes, 0, (int)file.Length);
        //    }
        //    BitArray bits = new BitArray(bytes);


        //    return Ok(bytes);

        //}
        ////-------

        public async Task <byte[]> convertImg(IFormFile image)
        { 

            byte[] res;
            using (var stream = new MemoryStream())
                    {
                         await image.CopyToAsync(stream);
                        res = stream.ToArray();
                    }
            return res;  
        }

        [HttpGet("img/{id}")]
        public async Task<byte[]> getimg([FromRoute] int id)
        {
            Models.Employee employee = await _context.Employees.FindAsync(id);
            return employee.img;

        }



        //[HttpPost("upload")]
        //public IActionResult upload(IFormFile file)
        //{
        //    Models.Employee employee = new Models.Employee();
        //    string folderName = @"ClientApp\src\assets";
        //    string webRootPath = _hostingEnvironment.WebRootPath;
        //    string cpath = Path.GetFullPath(Path.Combine(webRootPath, @"..\"));
        //    string newPath = Path.GetFullPath(Path.Combine(cpath, folderName));

        //    if (!Directory.Exists(newPath))
        //    {
        //        Directory.CreateDirectory(newPath);
        //    }
        //    string aux = addtime(Path.GetFileName(file.FileName));
        //    var fileName = Path.Combine(newPath, aux);
        //    file.CopyTo(new FileStream(fileName, FileMode.Create));
        //    employee.img = fileName;
        //    return Ok(employee);

        //}
        //public string addtime(string cad)
        //{
        //    string date = DateTime.Now.ToString();
        //    string d = "";
        //    foreach (var r in date)
        //        if (Char.IsDigit(r))
        //            d += r;
        //    return d + cad;
        //}
        //-------

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}