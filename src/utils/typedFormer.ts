export class TypedFormData<T extends object> extends FormData {
  constructor(data: T) {
    super();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this.append(key, String(data[key]));
      }
    }
  }
}

export class TypedFormGetter<T> {
  private formData: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  get(key: keyof T): FormDataEntryValue | null {
    return this.formData.get(key as string);
  }

  getForm(): FormData {
    return this.formData;
  }
}
