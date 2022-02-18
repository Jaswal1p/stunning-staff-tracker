INSERT INTO department (name)
VALUES
('General Surgery'),
('Emg Medicine'),
('Int Medicine'),
('Radiology');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Lead Dr', 2000, 1),
  ('Jun Dr', 1500, 2),
  ('Jun Dr', 1500, 3),
  ('Sen Dr', 2000, 4),
  ('Sen RN', 1100, 1),
  ('RN', 1000, 2),
  ('Lead RN', 1300, 3),
  ('RN', 1000, 4),
  ('Secr', 400, 1),
  ('Recep', 600, 2),
  ('Sen Tech', 500, 3),
  ('Jun Tech', 400, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id, is_manager)
VALUES
  ('Jim', 'Daly', 1, NULL, true),
  ('Mike', 'Jordan', 3, 1, true),
  ('Virat', 'Koli', 4, 1, true),
  ('Steve', 'Smith', 2, 1, true),
  ('Ally', 'Milano', 6, 4, false),
  ('Sam', 'Clinton', 5, 1, false),
  ('Tamika', 'James', 7, 3, false),
  ('Jemi', 'Rodriguez', 8, 2, false),
  ('Jef', 'Bezo', 9, 1, false),
  ('John', 'Dimo', 10, 2, false),
  ('Kaye', 'East', 11, 3, false),
  ('Nila', 'Kapur', 12, 4, false);

INSERT INTO manager (first_name, last_name)
SELECT first_name, last_name
FROM employee
WHERE is_manager = 1
