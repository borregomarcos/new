using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Employee.Models;

namespace Employee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmergencyContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmergencyContactsController(ApplicationDbContext context)
        {
            _context = context;
        }

        


        // GET: api/EmergencyContacts/emplyeee/id
        [HttpGet("employee/{id}")]
        public IEnumerable<EmergencyContact> GetEmergencyContactEmployee([FromRoute] int id)
        {
            return _context.EmergencyContacts.Where(x=>x.employeeId==id);
        }

        //GET: api/EmergencyContacts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmergencyContact([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var emergencyContact = await _context.EmergencyContacts.FindAsync(id);

            if (emergencyContact == null)
            {
                return NotFound();
            }

            return Ok(emergencyContact);
        }

        // PUT: api/EmergencyContacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmergencyContact([FromRoute] int id, [FromBody] EmergencyContact emergencyContact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != emergencyContact.Id)
            {
                return BadRequest();
            }

            _context.Entry(emergencyContact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmergencyContactExists(id))
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

        // POST: api/EmergencyContacts
        [HttpPost]
        public async Task<IActionResult> PostEmergencyContact([FromBody] EmergencyContact emergencyContact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.EmergencyContacts.Add(emergencyContact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmergencyContact", new { id = emergencyContact.Id }, emergencyContact);
        }

        // DELETE: api/EmergencyContacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmergencyContact([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var emergencyContact = await _context.EmergencyContacts.FindAsync(id);
            if (emergencyContact == null)
            {
                return NotFound();
            }

            _context.EmergencyContacts.Remove(emergencyContact);
            await _context.SaveChangesAsync();

            return Ok(emergencyContact);
        }

        private bool EmergencyContactExists(int id)
        {
            return _context.EmergencyContacts.Any(e => e.Id == id);
        }
    }
}