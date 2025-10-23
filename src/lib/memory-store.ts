interface User {
  id: number;
  email: string;
  name?: string;
}

interface Template {
  id: number;
  text: string;
  userId: number;
}

interface Daily {
  id: number;
  text: string;
  completed: boolean;
  day: number;
  month: number;
  year: number;
  userId: number;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  day: number;
  month: number;
  year: number;
  userId: number;
}

const users: User[] = [];
const templates: Template[] = [];
const dailies: Daily[] = [];
const todos: Todo[] = [];

let userIdCounter = 1;
let templateIdCounter = 1;
let dailyIdCounter = 1;
let todoIdCounter = 1;

function findOrCreateUser(email: string, name?: string): User {
  let user = users.find(u => u.email === email);
  if (!user) {
    user = {
      id: userIdCounter++,
      email,
      name
    };
    users.push(user);
  }
  return user;
}

export const memoryStore = {
  user: {
    findUnique: async ({ where }: { where: { email: string } }) => {
      return users.find(u => u.email === where.email) || null;
    },
    create: async ({ data }: { data: { email: string; name?: string } }) => {
      const user: User = {
        id: userIdCounter++,
        email: data.email,
        name: data.name
      };
      users.push(user);
      return user;
    }
  },
  template: {
    findMany: async () => {
      return templates;
    },
    create: async ({ data }: { data: { text: string; userId: number } }) => {
      const template: Template = {
        id: templateIdCounter++,
        text: data.text,
        userId: data.userId
      };
      templates.push(template);
      return template;
    },
    delete: async ({ where }: { where: { id: number } }) => {
      const index = templates.findIndex(t => t.id === where.id);
      if (index > -1) {
        const deleted = templates.splice(index, 1)[0];
        return deleted;
      }
      throw new Error('Template not found');
    }
  },
  daily: {
    findMany: async ({ where }: { where?: { month: number; year: number } } = {}) => {
      if (!where) return dailies;
      return dailies.filter(d => d.month === where.month && d.year === where.year);
    },
    create: async ({ data }: { data: { text: string; day: number; month: number; year: number; completed: boolean; userId: number } }) => {
      const daily: Daily = {
        id: dailyIdCounter++,
        text: data.text,
        day: data.day,
        month: data.month,
        year: data.year,
        completed: data.completed,
        userId: data.userId
      };
      dailies.push(daily);
      return daily;
    },
    update: async ({ where, data }: { where: { id: number }; data: { completed?: boolean } }) => {
      const daily = dailies.find(d => d.id === where.id);
      if (!daily) throw new Error('Daily not found');
      if (data.completed !== undefined) daily.completed = data.completed;
      return daily;
    },
    delete: async ({ where }: { where: { id: number } }) => {
      const index = dailies.findIndex(d => d.id === where.id);
      if (index > -1) {
        const deleted = dailies.splice(index, 1)[0];
        return deleted;
      }
      throw new Error('Daily not found');
    }
  },
  todo: {
    findMany: async ({ where }: { where?: { month: number; year: number } } = {}) => {
      if (!where) return todos;
      return todos.filter(t => t.month === where.month && t.year === where.year);
    },
    create: async ({ data }: { data: { text: string; day: number; month: number; year: number; completed: boolean; userId: number } }) => {
      const todo: Todo = {
        id: todoIdCounter++,
        text: data.text,
        day: data.day,
        month: data.month,
        year: data.year,
        completed: data.completed,
        userId: data.userId
      };
      todos.push(todo);
      return todo;
    },
    update: async ({ where, data }: { where: { id: number }; data: { completed?: boolean } }) => {
      const todo = todos.find(t => t.id === where.id);
      if (!todo) throw new Error('Todo not found');
      if (data.completed !== undefined) todo.completed = data.completed;
      return todo;
    },
    delete: async ({ where }: { where: { id: number } }) => {
      const index = todos.findIndex(t => t.id === where.id);
      if (index > -1) {
        const deleted = todos.splice(index, 1)[0];
        return deleted;
      }
      throw new Error('Todo not found');
    }
  }
};

export { findOrCreateUser };