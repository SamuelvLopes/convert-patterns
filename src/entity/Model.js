class Model {

    create(){
        console.log('criando '+this.constructor.name);
        console.log(this);
        console.log(Object.keys(this));

        knex('information_schema.columns')
        .select('column_name')
        .where({ table_schema: 'public', table_name: this.constructor.name.toLowerCase() })
        .then((rows) => {
            const columnNames = rows.map((row) => row.column_name);
            const valoresComuns = Object.keys(this).filter((valor) => columnNames.includes(valor));

            console.log('Nomes das colunas:', columnNames);
            console.log('valoresComuns:', valoresComuns);

            const objetoOriginal = {
                atributo1: 'valor1',
                atributo2: 'valor2',
                atributo3: 'valor3',
                atributo4: 'valor4',
              };
              
              const atributosDesejados = ['atributo1', 'atributo3'];
              
              const novoObjeto = {};
              
              valoresComuns.forEach((atributo) => {
                novoObjeto[atributo] = this[atributo];
              });
              
              console.log(novoObjeto);
              knex(this.constructor.name.toLowerCase()).
              insert(novoObjeto)
              .then(() => {
                console.log('Entrada criada com sucesso!');
                })
                .catch((err) => {
                console.error('Erro ao criar a entrada:', err);
                })
        });

    }

    find(){
        console.log('procurando '+this.constructor.name);
    }

    save(){
        console.log('salvando '+this.constructor.name);
    }

  }

module.exports=Model;