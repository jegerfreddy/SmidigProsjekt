package loading.smidig.smidig.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Act_Event")
public class ActEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "actevent_seq_gen")
    @SequenceGenerator(name = "actevent_seq_gen", sequenceName = "actevent_seq", allocationSize = 1)
    @Column(name = "actevent_id")
    private Long acteventID;

    @ManyToOne
    @JoinColumn(name = "act_id", nullable = true)
    @JsonIgnore
    @Nullable
    private Act act;

    @Column(name = "event_title")
    private String eventTitle;

    @Column(name = "option_1")
    private String option1;

    @Column(name = "option_2")
    private String option2;

    @Column(name = "option_3")
    private String option3;

    @Column(name = "option_4")
    private String option4;

    // Constructor
    public ActEvent(String eventTitle, String option1, String option2, String option3, String option4) {
        this.eventTitle = eventTitle;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
    }
}
