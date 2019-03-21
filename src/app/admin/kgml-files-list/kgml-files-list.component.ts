import { Component, OnInit } from '@angular/core';
import { KgmlFilesService } from '../kgml-files.service';
@Component({
  selector: 'app-kgml-files-list',
  templateUrl: './kgml-files-list.component.html',
  styleUrls: ['./kgml-files-list.component.css'],
  providers: [KgmlFilesService]
})
export class KgmlFilesListComponent implements OnInit {

  constructor(private service: KgmlFilesService) { }

  files: any = [];

  ngOnInit() {
    this.service.getAllKGMLFiles().subscribe(files => {
      this.files = files;
    })
  }

}
