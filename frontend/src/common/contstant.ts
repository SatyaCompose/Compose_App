export const Roles = ["Employee", "Admin"];

export const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export const Months_in_Digits= ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

export const generateLeaveEmailTemplate = (userName: string, startDate: string, endDate: string, cause: string) => `
  Subject: Leave Request from ${userName}

  Dear [Admin],

  I would like to request leave from ${startDate} to ${endDate}.
  Reason: ${cause}

  Kindly approve my request.

  Best Regards,
  ${userName}
`;

export const getLast10Days = () => {
    const today = new Date();
    const last10Days = [];

    for (let i = 0; i < 10; i++) {
        const day = new Date();
        day.setDate(today.getDate() - i); // Subtract i days from today's date
        last10Days.push({
            date: day.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            }), // Format: "Mon, Jun 26, 2023"
            isoDate: day.toISOString().split("T")[0], // ISO Date: "2024-11-24"
        });
    }

    return last10Days;
};

export const DEFAULT_SICK_LEAVES = 10;

export const DEFAULT_PAID_LEAVES = 20;

export const CLOCK_IN_TEXT = "Clocked in for today; keep it up! 🕒";

export const FULL_ATTENDANCE_TEXT = "Fully attended with great consistency! 🎉";

export const PARTIAL_ATTENDANCE_TEXT = "Partially attended; keep striving for full attendance! 🌟";

export const MINIMAL_ATTENDANCE_TEXT = "Minimal attendance; try to increase engagement! ⚡";

export const NO_ATTENDANCE_TEXT = "No attendance logged for this day. 🚫";

