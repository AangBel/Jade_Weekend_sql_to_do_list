CREATE TABLE "tasks"(
"id" SERIAL PRIMARY KEY,
"task" varchar(50),
"status" BOOLEAN DEFAULT FALSE
);