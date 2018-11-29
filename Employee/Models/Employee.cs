using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public double salary { get; set; }
        public byte[] img { get; set; }
        public List<EmergencyContact> EmergenceContacts { get; set; }
    }
}
