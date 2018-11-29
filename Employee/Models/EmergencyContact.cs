using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Employee.Models
{
    public class EmergencyContact
    {
        public int Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string phoneNumber { get; set; }
        [ForeignKey("employees")]
        public int employeeId { get; set; }
        public Employee Employee { get; set; }
    }
}
