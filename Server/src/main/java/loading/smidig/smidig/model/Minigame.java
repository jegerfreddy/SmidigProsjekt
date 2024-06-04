package loading.smidig.smidig.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "minigame")
public class Minigame {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "minigame_seq_gen")
    @SequenceGenerator(name = "minigame_seq_gen", sequenceName = "minigame_seq", allocationSize = 1)
    @Column(name = "minigame_id")
    private Long minigameID = 0L;

    @ManyToOne
    @JoinColumn(name = "act_id", nullable = true)
    @JsonIgnoreProperties({"actName", "events", "votes", "minigames"})
    @Nullable
    private Act act;

    @Column(name = "minigame_title")
    private String minigameTitle;
}
