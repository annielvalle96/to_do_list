-- Correr este código sql en el PgAdmin4 para crear la tabla en la BD.
CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE,
  description VARCHAR(255)
);