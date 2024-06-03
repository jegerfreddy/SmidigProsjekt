package loading.smidig.smidig.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "minigame_result")
public class MinigameResult {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "minigameresult_seq_gen")
    @SequenceGenerator(name = "minigameresult_seq_gen", sequenceName = "minigameresult_seq", allocationSize = 1)
    @Column(name = "minigameresult_result_id")
    private Long minigameResultID = 0L;

    @ManyToOne
    @JoinColumn(name = "minigame_id", nullable = true)
    private Minigame minigame;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnoreProperties({"avatarNumber", "verified"})
    private User user;

    @Column(name = "result")
    private int result;
}
