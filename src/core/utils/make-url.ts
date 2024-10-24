interface MakeOptions {
  requiredParams?: Record<string, unknown>
}

class MakeUrlBuilder {
  private url = ''

  private options: MakeOptions = {}

  private isFirstParam = true

  constructor(template: string) {
    this.url = template
  }

  private applyRequiredParams() {
    !!this.options?.requiredParams &&
      Object.entries(this.options?.requiredParams).forEach(
        ([parameter, value]) => this.addQueryParam(parameter, value),
      )
  }

  setOptions(options: MakeOptions) {
    this.options = options

    return this
  }

  interpolate(values: Record<string, unknown>) {
    this.url = Object.entries(values).reduce(
      (path, [parameter, value]) =>
        path.replace(`:${parameter}`, String(value)),
      this.url,
    )

    return this
  }

  addQueryParam(param: string, value: any) {
    if (!value || value === null) {
      return this
    }

    const ligature = this.isFirstParam ? '?' : '&'

    this.url = [this.url, `${param}=${value}`].join(ligature)
    this.isFirstParam = false

    return this
  }

  build() {
    this.applyRequiredParams()

    return this.url
  }
}

export const makeUrl = (template: string) => new MakeUrlBuilder(template)
