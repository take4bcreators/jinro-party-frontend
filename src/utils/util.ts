export class TypedFormData<T extends object> extends FormData {
  constructor(data: T) {
    super();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this.append(key, this.stringifyValue(data[key]));
      }
    }
  }

  private stringifyValue(value: any): string {
    return String(value);
  }
}
