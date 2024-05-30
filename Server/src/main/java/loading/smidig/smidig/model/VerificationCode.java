package loading.smidig.smidig.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "verification_code")
public class VerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "code_seq_gen")
    @SequenceGenerator(name = "code_seq_gen", sequenceName = "code_seq", allocationSize = 1)
    @Column(name = "code_id")
    private Long codeID = 0L;

    @Column(name = "code")
    private String code;

    @Column(name = "used")
    private int used;

    //Constructor
    public VerificationCode(String code) {
        this.code = code;
        this.used = 0;
    }
}
