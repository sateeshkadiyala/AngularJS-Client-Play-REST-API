package models;

import com.avaje.ebean.Model;
import com.sun.javafx.beans.IDProperty;
import play.data.format.Formats;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Users extends Model {

        @Id
        public java.util.UUID id;

        public String email;

        public String firstName;

        public String lastName;

        @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
        public Date lastLogin;

        @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
        public Date createdDate;

        public boolean isEmailValidated;

}
