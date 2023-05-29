export class userGestor {
  // Debido a que en JS no se puede privatizar el constructor, supondremos que no se podra llamar al constructor fuera de la clase
  singletoninstance;
  constructor(Users) {
    this.#Users = Users;
  }
  static async getInstance(Users) {
    if (this.singletoneInstance === null) {
      this.singletoneInstance = new userGestor(Users);
    }
    return this.singletoneInstance;
  }
}
