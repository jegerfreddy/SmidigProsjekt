package loading.smidig.smidig.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "admin_user")
public class AdminUser {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_user_seq_gen")
    @SequenceGenerator(name = "admin_user_seq_gen", sequenceName = "admin_user_seq", allocationSize = 1)
    @Column(name = "admin_id")
    private Long adminID = 0L;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;
}
