package models;

import com.avaje.ebean.Model;
import com.sun.javafx.beans.IDProperty;
import play.data.format.Formats;
import securesocial.core.GenericProfile;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.Date;

@Table(
        uniqueConstraints=
        @UniqueConstraint(columnNames={"provider", "provider_user_id"})
)
@Entity
public class Customers extends Model{

        @Id
        public java.util.UUID id;

        public String provider;

        public String providerUserId;

        public String email;

        public String firstName;

        public String lastName;

        @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
        public Date lastLogin;

        @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
        public Date createdDate;

        public boolean isEmailValidated;

}
