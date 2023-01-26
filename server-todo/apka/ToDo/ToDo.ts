import { redisClient } from "../..";

export const PobierzListyTodo = () => {};

export const DodajListeTodo = (data: any) => {};

export const PobierzTodoCurrentId = async () => {
  return new Promise(async function (resolve, reject) {
    let current_id = await redisClient.get("todoListCurrentId");
    resolve(current_id);
  });
};
