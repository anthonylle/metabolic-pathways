import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-algorithm-selector',
  templateUrl: './algorithm-selector.component.html',
  styleUrls: ['./algorithm-selector.component.css']
})
export class AlgorithmSelectorComponent implements OnInit {

  constructor() { }

  options: any[];

  ngOnInit() {
    $(document).ready( function() {

      $("#filter-bar li").click(function(){
        $("#filter-bar li").removeClass("active");
        $(this).addClass("active");
        $("#filter-bar").removeClass().addClass($(this).attr("data-target"));
      });
    })

    this.options = [{value: 'Ori1', label:'2D to 1D Transformation'}, {value: 'Ori2', label:'Differentiation by pairs'}];
  }

  changeAlgorithmView(currentView: string) {
    alert(currentView);
    let algorithmOptions;
    if(currentView === 'Original'){
      algorithmOptions = [{value: 'Ori1', label:'2D to 1D Transformation'}, {value: 'Ori2', label:'Differentiation by pairs'}];
    }else{
      if (currentView === 'Extended'){
        algorithmOptions = [{value: '1.1', label: '1.1'},{value: '1.2', label: '1.2'},{value: '1.3', label: '1.3'},{value: '1.4', label: '1.4'},{value: '1.5', label: '1.5'},];
      }else{
        algorithmOptions = [{value: '0', label: "Not available yet"}];
      }
    }

  }

  displayCurrentValue(value: string){
    alert('Current value: ' + value);
  }



}
