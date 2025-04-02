import { Injectable } from '@angular/core';
import { faBars, faCheck, faCircle, faCircleNotch, faClose, faDotCircle, faEdit, faEye, faPlus, faSave, faSearch, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  icons: { [key: string]: IconDefinition} = {
    'close': faClose,
    'edit': faEdit,
    'delete': faTrash,
    'eye': faEye,
    'plus': faPlus,
    'check': faCheck,
    'circle': faCircle,
    'dot-circle': faDotCircle,
    'search': faSearch,
    'save': faSave,
    'loading': faCircleNotch,
    'bars': faBars
  }

  getIcon(name: string): IconDefinition {
    return this.icons[name] || faCircle;
  }


}
