using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Employee.Models;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;


using System.IO;






namespace Employee.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public PeopleController(ApplicationDbContext context, IHostingEnvironment Ihe)
        {
            _context = context;
            this._hostingEnvironment = Ihe;
        }

        //------------------------------------
        //[HttpPost, DisableRequestSizeLimit]
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

        //----------------------------------

        //[HttpPost, DisableRequestSizeLimit]
        //public IActionResult UploadFile()
        //{
        //    Models.Employee employee = new Models.Employee();
        //    string fullPath = "";
        //    try
        //    {
        //        var file = Request.Form.Files[0];
        //        string folderName = "Upload";
        //        string webRootPath = _hostingEnvironment.WebRootPath;
        //        string newPath = Path.Combine(webRootPath, folderName);
        //        string d = "";
        //        if (!Directory.Exists(newPath))
        //        {
        //            Directory.CreateDirectory(newPath);
        //        }
        //        if (file.Length > 0)
        //        {
        //            string date = DateTime.Now.ToString();

        //            foreach (var r in date)
        //                if (Char.IsDigit(r))
        //                    d += r;

        //            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //            fileName = d + fileName;
        //             fullPath = Path.Combine(newPath, fileName);
        //            using (var stream = new FileStream(fullPath, FileMode.Create))
        //            {
        //                file.CopyTo(stream);
        //            }

        //        }
        //        employee.img = "/" +Path.GetFileName(file.FileName);
        //        return Ok(employee);
        //    }
        //    catch (System.Exception ex)
        //    {
        //        return Ok("error" + ex);
        //    }
        //}


        //--------------------------------------
        [HttpGet]
        public IEnumerable<Person> GetoPersons()
        {
            return _context.Persons;
        }

        [HttpGet("mas")]
        public IEnumerable<Person> GetoPpersons()
        {
            return _context.Persons;
        }

        // GET: api/People/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetPerson([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var person = await _context.Persons.FindAsync(id);

        //    if (person == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(person);
        //}

        // PUT: api/People/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson([FromRoute] int id, [FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != person.id)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
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

        //// POST: api/People
        //[HttpPost]
        //public async Task<IActionResult> PostPerson([FromBody] Person person)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.Persons.Add(person);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetPerson", new { id = person.id }, person);
        //}
        

        // DELETE: api/People/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = await _context.Persons.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();

            return Ok(person);
        }

        private bool PersonExists(int id)
        {
            return _context.Persons.Any(e => e.id == id);
        }
    }
}