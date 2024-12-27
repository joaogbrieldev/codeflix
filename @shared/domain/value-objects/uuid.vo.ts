import { v4 as uuid, validate } from 'uuid';
import ValueObject from "./value-object";

export default class Uuid extends ValueObject {
  readonly id: string;
  constructor(id?: string){
    super()
    this.id = id || uuid()
    this.validate()
  }
  private validate(){
    const isValid = validate(this.id)
    if (!isValid){
      throw new InvalidUuidError()
    }
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string){
    super(message || "ID must be a valid UUID")
    this.name = "InvalidUuidError"
  }

}