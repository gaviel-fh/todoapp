class Cicd implements Serializable {
    def script
    def staticCodeAnalysis

    Cicd(def script) {
        this.script = script
        staticCodeAnalysis = load('./staticCodeAnalysis.groovy')
    }

    def load(String path) {
        return script.load(path)
    }
}
return new Cicd(script)