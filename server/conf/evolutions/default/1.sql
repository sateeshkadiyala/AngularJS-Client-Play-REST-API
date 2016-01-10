# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table users (
  id                        varchar(40) not null,
  email                     varchar(255),
  first_name                varchar(255),
  last_name                 varchar(255),
  last_login                timestamp,
  created_date              timestamp,
  is_email_validated        boolean,
  constraint pk_users primary key (id))
;




# --- !Downs

drop table if exists users cascade;

