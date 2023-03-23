import { redisClient } from "../..";

export const PobierzListyTodo = async (user_id: string) => {
  return new Promise(async function (resolve, reject) {
    let tablica: any = [];
    let redis_nazwa_user_uprawnienia = "userUprawnieniaToDo".concat(
      ":",
      user_id
    );
    let lista = await redisClient.lRange(redis_nazwa_user_uprawnienia, 0, -1);
    for (let i = 0; i < lista.length; i++) {
      let parsed = JSON.parse(await redisClient.get(lista[i]));
      tablica.push(parsed);
    }

    resolve(tablica);
  });
};

export const DodajListeTodo = (data: { person_id: number; name: string }) => {
  return new Promise(async function (resolve, reject) {
    let id_nowej_listy: number = await PobierzTodoCurrentId();
    id_nowej_listy += 1;

    let lista_format = JSON.stringify({
      id: id_nowej_listy,
      name: data.name,
    });

    let redis_nazwa_lista = "listaToDo".concat(":", id_nowej_listy.toString());
    let redis_nazwa_uprawnienia_uzytkownika = "userUprawnieniaToDo".concat(
      ":",
      data.person_id.toString()
    );
    let transaction = await redisClient
      .multi()
      .set(redis_nazwa_lista, lista_format)
      .lPush(redis_nazwa_uprawnienia_uzytkownika, redis_nazwa_lista)
      .incrBy("todoListCurrentId", 1)
      .exec();
    if (transaction) {
      resolve(transaction);
    } else {
      resolve({ error: "Błąd DodajListeTodo" });
    }
  });
};
export const DodajNoweZadanieTodo = async (data: any) => {
  let timestamp: number = new Date().getTime();

  // NAZWY REDIS
  let taskId = (
    parseInt(await redisClient.get("currentTaskId")) + 1
  ).toString();
  let lista_taskow = "taskiListy".concat(data.listId);
  let nazwa_taska = "zadanie".concat(":", taskId);
  let task = {
    id: taskId,
    name: data.name,
    done: false,
    created_timestamp: timestamp,
    end_timestamp: null,
    deadline_timestamp: data.deadline_timestamp || null,
    priority: 0,
    mark: false,
  };

  let transaction = await redisClient
    .multi()
    .lPush(lista_taskow, taskId)
    .set(nazwa_taska, JSON.stringify(task))
    .incrBy("currentTaskId", 1)
    .lPush(`zadania:${data.listId}`, `zadanie:${taskId}`)
    .exec();
  console.log(transaction);
  return { status: "success", message: "Dodano taska :)" };
};
export const PobierzZadaniaToDo = async (lista_id: string) => {
  let tablica_zadan: any[] = [];
  let redis_nazwa_listazadan = "zadania".concat(":", lista_id);
  let lista_zadan = await redisClient.lRange(redis_nazwa_listazadan, 0, -1);
  for (let i = 0; i < lista_zadan.length; i++) {
    console.log(lista_zadan[i]);
    let zadanie = JSON.parse(await redisClient.get(lista_zadan[i]));
    tablica_zadan.push(zadanie);
  }
  console.log(tablica_zadan);
  return tablica_zadan;
};

export const PobierzTodoCurrentId = async () => {
  return new Promise<number>(async function (resolve, reject) {
    let current_id = await redisClient.get("todoListCurrentId");
    resolve(parseInt(current_id));
  });
};
