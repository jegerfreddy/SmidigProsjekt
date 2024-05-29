package loading.smidig.smidig.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "act_name")
    private String actName;

    @OneToMany(mappedBy = "act", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("act")
    private List<ActEvent> events = new ArrayList<>();
}
