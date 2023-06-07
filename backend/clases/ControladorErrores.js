export default class ErrorHandler {

    static control(err, req, res, next) {
      res.status(500).send({ message: err.message });
    }
  
}