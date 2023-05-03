class Cicd implements Serializable {
    def staticCodeAnalysis

    Cicd() {
        staticCodeAnalysis = load './staticCodeAnalysis.groovy'
    }
}
return new Cicd()