package loading.smidig.smidig.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "vote")
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "vote_seq_gen")
    @SequenceGenerator(name = "vote_seq_gen", sequenceName = "vote_seq", allocationSize = 1)
    @Column(name = "vote_id")
    private Long voteID;

    @ManyToOne
    @JoinColumn(name = "act_id", nullable = true)
    @JsonIgnoreProperties({"actName", "events"})
    private Act act;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnoreProperties({"username", "avatarNumber", "verified"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "actevent_id", nullable = true)
    @JsonIgnoreProperties({"eventTitle", "eventIndex", "option1", "option2", "option3", "option4"})
    private ActEvent actEvent;

    @Column(name = "option")
    private int option;
}
