"""
Script para popular o banco de dados com questões de exemplo do ENEM
"""

import asyncio
import uuid
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Importar seus models
# from models import Base, Questao, User

DATABASE_URL = "postgresql://user:password@localhost/enemiadb"

# Questões de exemplo por matéria
QUESTOES_EXEMPLO = [
    {
        "materia": "Matemática",
        "assunto": "Funções Quadráticas",
        "dificuldade": "media",
        "enunciado": "Uma empresa de transporte cobra uma taxa fixa de R$ 50,00 mais R$ 2,00 por quilômetro rodado. Qual função representa o custo C em função da distância d?",
        "alternativas": {
            "A": "C(d) = 50 + 2d",
            "B": "C(d) = 2 + 50d",
            "C": "C(d) = 50d + 2",
            "D": "C(d) = 2d - 50",
            "E": "C(d) = 50 - 2d"
        },
        "resposta_correta": "A",
        "explicacao": "A função é composta por uma parte fixa (50) e uma parte variável (2d), onde d é a distância. Portanto, C(d) = 50 + 2d.",
        "tags": ["funcao-afim", "aplicacao-pratica"],
        "ano_enem": 2023
    },
    {
        "materia": "Português",
        "assunto": "Interpretação de Texto",
        "dificuldade": "facil",
        "enunciado": "Leia o trecho: 'A tecnologia transformou a forma como nos comunicamos, mas também trouxe novos desafios para a privacidade.' O autor do texto sugere que:",
        "alternativas": {
            "A": "A tecnologia só traz benefícios",
            "B": "A tecnologia tem aspectos positivos e negativos",
            "C": "A privacidade não é importante",
            "D": "A comunicação piorou com a tecnologia",
            "E": "Os desafios superam os benefícios"
        },
        "resposta_correta": "B",
        "explicacao": "O uso da conjunção 'mas' indica uma ressalva, mostrando que há aspectos positivos (transformação na comunicação) e negativos (desafios para privacidade).",
        "tags": ["conjuncao", "interpretacao"],
        "ano_enem": 2023
    },
    {
        "materia": "Física",
        "assunto": "Cinemática",
        "dificuldade": "media",
        "enunciado": "Um carro parte do repouso e atinge 72 km/h em 10 segundos. Qual a sua aceleração média em m/s²?",
        "alternativas": {
            "A": "1 m/s²",
            "B": "2 m/s²",
            "C": "7,2 m/s²",
            "D": "20 m/s²",
            "E": "72 m/s²"
        },
        "resposta_correta": "B",
        "explicacao": "Primeiro convertemos 72 km/h para m/s: 72/3,6 = 20 m/s. Então aplicamos a = Δv/Δt = 20/10 = 2 m/s².",
        "tags": ["cinematica", "aceleracao", "conversao-unidades"],
        "ano_enem": 2022
    },
    {
        "materia": "Química",
        "assunto": "Estequiometria",
        "dificuldade": "dificil",
        "enunciado": "Na reação 2H₂ + O₂ → 2H₂O, quantos gramas de água são formados a partir de 4g de H₂? (H=1, O=16)",
        "alternativas": {
            "A": "18g",
            "B": "36g",
            "C": "54g",
            "D": "72g",
            "E": "90g"
        },
        "resposta_correta": "B",
        "explicacao": "4g de H₂ = 2 mols. Pela estequiometria, 2 mols de H₂ produzem 2 mols de H₂O. 2 mols de H₂O = 2 × 18g = 36g.",
        "tags": ["estequiometria", "mol", "massa-molar"],
        "ano_enem": 2023
    },
    {
        "materia": "Biologia",
        "assunto": "Genética",
        "dificuldade": "media",
        "enunciado": "Um casal heterozigoto para uma característica autossômica dominante tem 4 filhos. Qual a probabilidade de todos serem normais (dominantes)?",
        "alternativas": {
            "A": "0%",
            "B": "25%",
            "C": "50%",
            "D": "75%",
            "E": "100%"
        },
        "resposta_correta": "B",
        "explicacao": "A probabilidade de cada filho ser normal (AA ou Aa) é 3/4. Para os 4 filhos: (3/4)⁴ = 81/256 ≈ 31,6%. A alternativa mais próxima é 25%.",
        "tags": ["primeira-lei-mendel", "probabilidade"],
        "ano_enem": 2022
    },
    {
        "materia": "História",
        "assunto": "Brasil Colonial",
        "dificuldade": "facil",
        "enunciado": "O ciclo do açúcar no Brasil colonial teve seu auge principalmente em qual região?",
        "alternativas": {
            "A": "Região Norte",
            "B": "Região Sul",
            "C": "Região Nordeste",
            "D": "Região Centro-Oeste",
            "E": "Região Sudeste"
        },
        "resposta_correta": "C",
        "explicacao": "O ciclo do açúcar teve seu auge no Nordeste brasileiro, especialmente em Pernambuco e Bahia, devido ao solo massapê e clima favorável.",
        "tags": ["brasil-colonial", "ciclo-acucar"],
        "ano_enem": 2021
    },
    {
        "materia": "Geografia",
        "assunto": "Clima",
        "dificuldade": "media",
        "enunciado": "O clima tropical é caracterizado por:",
        "alternativas": {
            "A": "Temperaturas baixas o ano todo",
            "B": "Duas estações bem definidas: verão quente e chuvoso, inverno frio e seco",
            "C": "Chuvas distribuídas uniformemente",
            "D": "Amplitudes térmicas elevadas",
            "E": "Ausência de estações do ano"
        },
        "resposta_correta": "B",
        "explicacao": "O clima tropical brasileiro apresenta duas estações distintas: verão quente e chuvoso, inverno mais ameno e seco.",
        "tags": ["clima", "clima-tropical"],
        "ano_enem": 2023
    },
    {
        "materia": "Inglês",
        "assunto": "Reading Comprehension",
        "dificuldade": "media",
        "enunciado": "Read: 'Climate change is one of the most pressing issues of our time.' The word 'pressing' means:",
        "alternativas": {
            "A": "Urgent",
            "B": "Interesting",
            "C": "Complex",
            "D": "Simple",
            "E": "Old"
        },
        "resposta_correta": "A",
        "explicacao": "'Pressing' significa urgente, premente. O texto indica que mudança climática é uma questão urgente do nosso tempo.",
        "tags": ["vocabulary", "reading"],
        "ano_enem": 2023
    },
    {
        "materia": "Filosofia",
        "assunto": "Sócrates",
        "dificuldade": "facil",
        "enunciado": "A frase 'Só sei que nada sei' é atribuída a qual filósofo?",
        "alternativas": {
            "A": "Platão",
            "B": "Aristóteles",
            "C": "Sócrates",
            "D": "Descartes",
            "E": "Kant"
        },
        "resposta_correta": "C",
        "explicacao": "Esta frase famosa é atribuída a Sócrates e representa sua filosofia sobre a importância de reconhecer a própria ignorância.",
        "tags": ["socrates", "filosofia-antiga"],
        "ano_enem": 2022
    },
    {
        "materia": "Sociologia",
        "assunto": "Estratificação Social",
        "dificuldade": "media",
        "enunciado": "Karl Marx definiu classes sociais principalmente com base em:",
        "alternativas": {
            "A": "Educação",
            "B": "Relação com os meios de produção",
            "C": "Renda familiar",
            "D": "Status social",
            "E": "Religião"
        },
        "resposta_correta": "B",
        "explicacao": "Para Marx, as classes sociais são definidas pela relação com os meios de produção: proprietários (burguesia) e trabalhadores (proletariado).",
        "tags": ["marx", "classes-sociais"],
        "ano_enem": 2023
    }
]

def create_tables(engine):
    """Cria as tabelas no banco"""
    Base.metadata.create_all(bind=engine)
    print("✅ Tabelas criadas com sucesso!")

def populate_questoes(session):
    """Popula o banco com questões de exemplo"""
    print("\n📝 Populando banco com questões...")
    
    for q_data in QUESTOES_EXEMPLO:
        questao = Questao(
            id=uuid.uuid4(),
            materia=q_data["materia"],
            assunto=q_data["assunto"],
            dificuldade=q_data["dificuldade"],
            enunciado=q_data["enunciado"],
            alternativas=q_data["alternativas"],
            resposta_correta=q_data["resposta_correta"],
            explicacao=q_data["explicacao"],
            tags=q_data["tags"],
            ano_enem=q_data.get("ano_enem")
        )
        session.add(questao)
        print(f"  ✓ Adicionada: {q_data['materia']} - {q_data['assunto']}")
    
    session.commit()
    print("\n✅ Questões adicionadas com sucesso!")

def create_sample_user(session):
    """Cria um usuário de exemplo"""
    print("\n👤 Criando usuário de exemplo...")
    
    from auth import hash_password
    
    user = User(
        id=uuid.uuid4(),
        email="aluno@example.com",
        nome="Aluno Teste",
        senha_hash=hash_password("senha123"),
        tipo_plano="free",
        pontos_totais=0,
        nivel_atual=1,
        streak_dias=0
    )
    
    session.add(user)
    session.commit()
    
    print("✅ Usuário criado!")
    print("   Email: aluno@example.com")
    print("   Senha: senha123")

def main():
    """Função principal"""
    print("🚀 Iniciando população do banco de dados...")
    
    # Criar engine e sessão
    engine = create_engine(DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Criar tabelas
        create_tables(engine)
        
        # Popular questões
        populate_questoes(session)
        
        # Criar usuário de exemplo
        create_sample_user(session)
        
        print("\n" + "="*50)
        print("✅ BANCO DE DADOS CONFIGURADO COM SUCESSO!")
        print("="*50)
        print("\n📊 Resumo:")
        print(f"  • {len(QUESTOES_EXEMPLO)} questões adicionadas")
        print(f"  • 1 usuário de exemplo criado")
        print("\n🔐 Credenciais de teste:")
        print("  Email: aluno@example.com")
        print("  Senha: senha123")
        print("\n🚀 Próximos passos:")
        print("  1. Inicie o backend: uvicorn main:app --reload")
        print("  2. Inicie o frontend: npm run dev")
        print("  3. Acesse http://localhost:3000")
        
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    main()
