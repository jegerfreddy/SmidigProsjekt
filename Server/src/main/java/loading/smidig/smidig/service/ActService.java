package loading.smidig.smidig.service;

import loading.smidig.smidig.model.Act;
import loading.smidig.smidig.repository.ActRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActService {

    private final ActRepository actRepository;

    @Autowired
    public ActService(ActRepository actRepository) {
        this.actRepository = actRepository;
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
}
