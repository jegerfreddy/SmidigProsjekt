package loading.smidig.smidig.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "feedback_seq_gen")
    @SequenceGenerator(name = "feedback_seq_gen", sequenceName = "feedback_user_seq", allocationSize = 1)
    @Column(name = "feedback_id")
    private Long feedbackID = 0L;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnoreProperties({"avatarNumber", "verified"})
    private User user;

    @Column(name = "rating")
    private int rating;

    @ManyToOne
    @JoinColumn(name = "act_id", nullable = true)
    @JsonIgnoreProperties({"actName", "events", "votes", "minigames"})
    @Nullable
    private Act act;
}
