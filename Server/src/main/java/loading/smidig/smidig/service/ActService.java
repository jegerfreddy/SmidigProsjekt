package loading.smidig.smidig.service;

import loading.smidig.smidig.model.Act;
import loading.smidig.smidig.model.ActEvent;
import loading.smidig.smidig.repository.ActEventRepository;
import loading.smidig.smidig.repository.ActRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActService {

    private final ActRepository actRepository;
    private final ActEventRepository actEventRepository;

    @Autowired
    public ActService(ActRepository actRepository, ActEventRepository actEventRepository) {
        this.actRepository = actRepository;
        this.actEventRepository = actEventRepository;
    }

    public List<Act> getActs() {
        return actRepository.findAll();
    }

    public Act getActsById(Long id){
        return actRepository.findById(id).orElse(null);
    }

    public Act createAct(Act act){
        return actRepository.save(act);
    }

    public void deleteActById(Long id) {
        actRepository.deleteById(id);
    }

    public Act updateAct(Act act) {
        return actRepository.save(act);
    }

    public void linkActEventToAct(Long actID, Long acteventID) {
        Act act = actRepository.findById(actID).orElse(null);
        ActEvent actEvent = actEventRepository.findById(acteventID).orElse(null);

        if (act != null && actEvent != null) {
            actEvent.setAct(act);
            actEventRepository.save(actEvent);
        }
    }
}
