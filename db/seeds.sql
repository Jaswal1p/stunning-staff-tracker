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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Jim', 'Daly', 1, NULL),
  ('Mike', 'Jordan', 3, 1),
  ('Virat', 'Koli', 4, 1),
  ('Steve', 'Smith', 2, 1),
  ('Ally', 'Milano', 6, 4),
  ('Sam', 'Clinton', 5, 1),
  ('Tamika', 'James', 7, 3),
  ('Jemi', 'Rodriguez', 8, 2),
  ('Jef', 'Bezo', 9, 1),
  ('John', 'Dimo', 10, 2),
  ('Kaye', 'East', 11, 3),
  ('Nila', 'Kapur', 12, 4);
