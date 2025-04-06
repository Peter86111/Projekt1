namespace mrq.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public string? Name { get; set; }
        public string? Email { get; set; }

        public int? UserId { get; set; }
    }
}


