# 🐉 PokeRoster

PokeRoster is a simple full-stack app for managing Pokémon trainers and their Pokémon.

It allows you to add Pokémon, automatically create trainers when needed, and view everything in a clean, expandable interface.

This project was built to practice relational database design, backend structure, and dynamic UI rendering.

---

## 🚀 Features

- 📊 Dashboard displaying:
  - Total Trainers  
  - Total Pokémon  
  - Total Types  

- ➕ Add Pokémon
  - Select an existing trainer using autocomplete  
  - Or type a new trainer name (created automatically)  
  - Choose a Pokémon type  

- 👥 Trainers Page
  - Displays all trainers  
  - Shows total Pokémon count per trainer  
  - Click a trainer to expand and view their Pokémon  
  - Pokémon displayed as styled badges  

- 🧠 Smart Trainer Handling
  - Prevents duplicate trainer names  
  - Automatically links Pokémon using foreign keys  
  - Clean separation between route logic and database logic  

---

## 🛠 Tech Stack

- Node.js  
- Express  
- EJS  
- PostgreSQL  
- Vanilla CSS  

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd PokeRoster
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
DATABASE_URL=your_database_connection_string
```

### 4. Create the database tables

```sql
CREATE TABLE trainers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE pokemons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
  type_id INTEGER REFERENCES types(id)
);
```

### 5. Start the server

```bash
node index.js
```

Then visit:

```
http://localhost:3000
```

---

## 📌 Project Goals

This project focuses on:

- Clean backend architecture  
- Separation of concerns  
- Relational database handling  
- Dynamic EJS rendering  
- Expandable UI interactions  

It serves as a foundation for building more advanced full-stack applications.