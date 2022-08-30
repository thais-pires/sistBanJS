class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoData = document.querySelector('#dataAniversario');
        const elementoTipoConta = document.querySelector('#tipos');

        switch (elementoTipoConta) {
            case Conta: {
                const conta = new Conta(elementoNumero.value,
                    Number(elementoSaldo.value));
                this.repositorioContas.adicionar(conta);
                this.inserirContaNoHTML(conta);
                break;
            }
            case ContaBonificada: {
                const conta = new ContaBonificada(elementoNumero.value,
                    Number(elementoSaldo.value));
                this.repositorioContas.adicionar(conta);
                this.inserirContaNoHTML(conta);
                break;
            }
            case Poupanca: {
                const conta = new Poupanca(elementoNumero.value,
                    Number(elementoSaldo.value),elementoData.value);
                this.repositorioContas.adicionar(conta);
                this.inserirContaNoHTML(conta);
                break;
            }
            default: {
                console.log("Não é um tipo de conta válido");
                break;
            }
        }
    }

    inserirContaNoHTML(conta) {
        const elementoP = document.createElement('p');
        elementoP.textContent = 'Conta ' + conta.numero + ': ' + conta.saldo;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }
}
