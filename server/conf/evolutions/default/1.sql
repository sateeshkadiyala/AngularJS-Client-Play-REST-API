# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table customers (
  id                        varchar(40) not null,
  provider                  varchar(255),
  provider_user_id          varchar(255),
  email                     varchar(255),
  first_name                varchar(255),
  last_name                 varchar(255),
  last_login                timestamp,
  created_date              timestamp,
  is_email_validated        boolean,
  constraint uq_customers_1 unique (provider,provider_user_id),
  constraint pk_customers primary key (id))
;




# --- !Downs

drop table if exists customers cascade;

