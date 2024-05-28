package loading.smidig.smidig.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "act")
public class Act {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "act_seq_gen")
    @SequenceGenerator(name = "act_seq_gen", sequenceName = "act_seq", allocationSize = 1)
    @Column(name = "act_id")
    private Long actID = 0L;
}
