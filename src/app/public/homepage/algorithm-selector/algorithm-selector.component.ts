import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-algorithm-selector',
  templateUrl: './algorithm-selector.component.html',
  styleUrls: ['./algorithm-selector.component.css']
})
export class AlgorithmSelectorComponent implements OnInit {

  constructor() { }

  options: any[];
  defaultValueOption: string;
  currentOption: string;

  ngOnInit() {
    $(document).ready( function() {
      $("#filter-bar li").click(function(){
        $("#filter-bar li").removeClass("active");
        $(this).addClass("active");
        $("#filter-bar").removeClass().addClass($(this).attr("data-target"));
      });
    });

    this.options = [{value: 'Ori1', label:'2D to 1D Transformation'}, {value: 'Ori2', label:'Differentiation by pairs'}];
    this.defaultValueOption = this.options[0];
    this.currentOption = 'Original';
  }

  changeAlgorithmView(currentView: string) {
    //alert(currentView);
    if(currentView === 'Original'){
      this.options = [{value: 'Ori1', label:'2D to 1D Transformation'}, {value: 'Ori2', label:'Differentiation by pairs'}];
      this.hideNodeParametersView();
    }else{
      if (currentView === 'Extended'){
        this.options = [{value: '1.1', label: '1.1 - Starting at any node, Finishing at any node'},
                        {value: '1.2', label: '1.2 - Starting at a given node, Finishing at any node'},
                        {value: '1.3', label: '1.3 - Starting at a given node, Finishing at a given node'},
                        {value: '1.4', label: '1.4 - Evaluation of all possible paths'},
                        {value: '1.5', label: '1.5 - Starting at any node, Finishing at a given node'}];
        this.showNodeParametersView();
      }else{
        this.options = [{value: '0', label: "Not available yet"}];
        this.hideNodeParametersView();
      }
    }
  }

  displayCurrentValue(value: string){
    //alert('Current value: ' + value);
  }

  showNodeParametersView(){
    let view = document.getElementById("Nodes-Parameter-View");
    view.setAttribute("style", "visibility: visible");
    //document.getElementById("Nodes-Parameter-View").style.transform = "visibility: visible;";
  }

  hideNodeParametersView(){
    let view = document.getElementById("Nodes-Parameter-View");
    view.setAttribute("style", "visibility: hidden;");
    //document.getElementById("Nodes-Parameter-View").style.transform = "visibility: hidden;";
  }





}
