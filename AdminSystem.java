import java.util.*;

class User {
    String name;
    String email;
    String password;
    String role;
    ArrayList<String> tasks = new ArrayList<>();
    ArrayList<String> reports = new ArrayList<>();

    User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = "User";
    }
}

public class AdminSystem {

    static ArrayList<User> users = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);
    static User currentUser = null;

    // ---------- SIGNUP ----------
    static void signup() {
        System.out.print("Enter Name: ");
        String name = sc.nextLine();

        System.out.print("Enter Email: ");
        String email = sc.nextLine();

        // Check if user exists
        for (User u : users) {
            if (u.email.equals(email)) {
                System.out.println("User already exists!");
                return;
            }
        }

        System.out.print("Enter Password: ");
        String password = sc.nextLine();

        users.add(new User(name, email, password));
        System.out.println("Signup successful!");
    }

    // ---------- LOGIN ----------
    static void login() {
        System.out.print("Enter Email: ");
        String email = sc.nextLine();

        System.out.print("Enter Password: ");
        String password = sc.nextLine();

        for (User u : users) {
            if (u.email.equals(email) && u.password.equals(password)) {
                currentUser = u;
                System.out.println("Login successful!");
                dashboard();
                return;
            }
        }

        System.out.println("Invalid credentials!");
    }

    // ---------- RESET PASSWORD ----------
    static void resetPassword() {
        System.out.print("Enter Email: ");
        String email = sc.nextLine();

        for (User u : users) {
            if (u.email.equals(email)) {
                System.out.print("Enter New Password: ");
                u.password = sc.nextLine();
                System.out.println("Password updated!");
                return;
            }
        }

        System.out.println("User not found!");
    }

    // ---------- DASHBOARD ----------
    static void dashboard() {
        while (true) {
            System.out.println("\n=== DASHBOARD ===");
            System.out.println("1. View Users");
            System.out.println("2. Add Task");
            System.out.println("3. View Tasks");
            System.out.println("4. Add Report");
            System.out.println("5. View Reports");
            System.out.println("6. Logout");

            int ch = sc.nextInt();
            sc.nextLine();

            switch (ch) {
                case 1:
                    viewUsers();
                    break;
                case 2:
                    addTask();
                    break;
                case 3:
                    viewTasks();
                    break;
                case 4:
                    addReport();
                    break;
                case 5:
                    viewReports();
                    break;
                case 6:
                    currentUser = null;
                    return;
            }
        }
    }

    // ---------- VIEW USERS ----------
    static void viewUsers() {
        System.out.println("\n--- USERS ---");
        for (User u : users) {
            System.out.println(u.name + " | " + u.email);
        }
    }

    // ---------- ADD TASK ----------
    static void addTask() {
        System.out.print("Enter task: ");
        String task = sc.nextLine();
        currentUser.tasks.add(task);
        System.out.println("Task added!");
    }

    // ---------- VIEW TASKS ----------
    static void viewTasks() {
        System.out.println("\n--- TASKS ---");
        for (String t : currentUser.tasks) {
            System.out.println(t);
        }
    }

    // ---------- ADD REPORT ----------
    static void addReport() {
        System.out.print("Enter report: ");
        String report = sc.nextLine();
        currentUser.reports.add(report);
        System.out.println("Report added!");
    }

    // ---------- VIEW REPORTS ----------
    static void viewReports() {
        System.out.println("\n--- REPORTS ---");
        for (String r : currentUser.reports) {
            System.out.println(r);
        }
    }

    // ---------- MAIN MENU ----------
    public static void main(String[] args) {
        while (true) {
            System.out.println("\n=== ADMIN SYSTEM ===");
            System.out.println("1. Signup");
            System.out.println("2. Login");
            System.out.println("3. Reset Password");
            System.out.println("4. Exit");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1:
                    signup();
                    break;
                case 2:
                    login();
                    break;
                case 3:
                    resetPassword();
                    break;
                case 4:
                    System.exit(0);
            }
        }
    }
}