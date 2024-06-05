package loading.smidig.smidig.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActEventDTO {
    private Long acteventID;
    private Long actID;
    private String eventTitle;
    private Long eventIndex;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
}