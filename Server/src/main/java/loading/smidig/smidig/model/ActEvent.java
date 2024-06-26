package loading.smidig.smidig.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    @JsonIgnoreProperties({"actName", "events", "votes"})
    @Nullable
    private Act act;

    @Column(name = "event_title")
    private String eventTitle;

    @Column(name = "event_index")
    private Long eventIndex;

    @Column(name = "option_1")
    private String option1;

    @Column(name = "option_2")
    private String option2;

    @Column(name = "option_3")
    private String option3;

    @Column(name = "option_4")
    private String option4;

    @OneToMany(mappedBy = "actEvent")
    @JsonIgnore
    private List<Vote> votes;

    @ManyToOne
    @JoinColumn(name = "next_event_option_1", nullable = true)
    @jakarta.annotation.Nullable
    @JsonIgnore
    private ActEvent nextEventOption1;

    @ManyToOne
    @JoinColumn(name = "next_event_option_2", nullable = true)
    @jakarta.annotation.Nullable
    @JsonIgnore
    private ActEvent nextEventOption2;

    @ManyToOne
    @JoinColumn(name = "next_event_option_3", nullable = true)
    @jakarta.annotation.Nullable
    @JsonIgnore
    private ActEvent nextEventOption3;

    @ManyToOne
    @JoinColumn(name = "next_event_option_4", nullable = true)
    @jakarta.annotation.Nullable
    @JsonIgnore
    private ActEvent nextEventOption4;

    // Constructor
    public ActEvent(String eventTitle, String option1, String option2, String option3, String option4) {
        this.eventTitle = eventTitle;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
    }
}
