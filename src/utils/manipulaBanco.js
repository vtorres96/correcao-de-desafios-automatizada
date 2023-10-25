const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'silly.db.elephantsql.com',
        user: 'bzndwiea',
        password: '4txlSFTZ_3gYHeac9ASGYCckCecZIktO',
        database: 'bzndwiea'
    }
});

const restaurarDados = async () => {
    knex.raw("PRAGMA foreign_keys = OFF");
    knex.raw("SET session_replication_role = 'replica'");
    knex.raw(`
        drop table if exists transacoes;
        drop table if exists categorias;
        truncate usuarios restart identity;
        
        CREATE TABLE if not exists categorias (
        id serial PRIMARY KEY,
        usuario_id integer null,
        descricao text
        );
        
        insert into categorias (descricao) values ('Alimentação'),
        ('Assinaturas e Serviços'),
        ('Casa'),
        ('Mercado'),
        ('Cuidados Pessoais'),
        ('Educação'),
        ('Família'),
        ('Lazer'),
        ('Pets'),
        ('Presentes'),
        ('Roupas'),
        ('Saúde'),
        ('Transporte'),
        ('Salário'),
        ('Vendas'),
        ('Outras receitas'),
        ('Outras despesas');
        
        CREATE TABLE if not exists transacoes (
        id serial PRIMARY KEY,
        descricao text,
        valor integer,
        data date DEFAULT now(),
        tipo text,
        categoria_id integer REFERENCES categorias(id),
        usuario_id integer REFERENCES usuarios(id)
        );
        
        select * from usuarios;
        select * from transacoes;
        select * from categorias;
    `)
    knex.raw("SET session_replication_role = 'origin'");
    knex.raw("PRAGMA foreign_keys = ON");
}

module.exports = {
    restaurarDados
}