import { redisClient } from "../..";

export const PobierzListyTodo = () => {};

export const DodajListeTodo = (data: { id: number; name: string }) => {
    return new Promise(async functionv(resolve, reject) {

    })
};

export const PobierzTodoCurrentId = async () => {
  return new Promise(async function (resolve, reject) {
    let current_id = await redisClient.get("todoListCurrentId");
    resolve(current_id);
  });
};
