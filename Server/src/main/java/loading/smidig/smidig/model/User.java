package loading.smidig.smidig.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
    @SequenceGenerator(name = "user_seq_gen", sequenceName = "user_seq", allocationSize = 1)
    @Column(name = "user_id")
    private Long userID = 0L;

    @Column(name = "username")
    private String username;

    @Column(name = "avatar")
    private int avatarNumber;

    @Column(name = "verified")
    private int verified = 0;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Vote> votes;


    //Constructor
    public User(String username, int avatarNumber) {
        this.username = username;
        this.avatarNumber = avatarNumber;
    }
}
