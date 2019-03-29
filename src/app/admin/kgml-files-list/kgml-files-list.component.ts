import { Component, OnInit } from '@angular/core';
import { KgmlFilesService } from '../kgml-files.service';
import { MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material';

@Component({
  selector: 'app-kgml-files-list',
  templateUrl: './kgml-files-list.component.html',
  styleUrls: ['./kgml-files-list.component.css'],
  providers: [KgmlFilesService]
})
export class KgmlFilesListComponent implements OnInit {

  constructor(private service: KgmlFilesService) { }

  file:any;
  files: any = [];
  filesData: MatTableDataSource<any>;
  displayedColumns: string[] = ['File Name', 'Upload Date', 'Actions'];

  ngOnInit() {
    this.service.getAllKGMLFiles().subscribe(files => {
      this.files = files;
      this.filesData = new MatTableDataSource<any>(files as
      {_id: string, length: number, chunkSize: number, uploadDate: string, filename: string, md5: string, contentType: string}[]);
    })
  }

  postcargarxml(){
    this.service.uploadKGMLFileToDB('//localhost:3000/api/upload',this.file).subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

  public onArchivoSeleccionado($event: { target: { files: any[]; }; }) {
    
    for (let i = 0; i < $event.target.files.length; i++) {
      this.file = $event.target.files[i];
      console.log(this.file.name);
    }
    this.postcargarxml();
    //var FileSaver = require('file-saver');
    //FileSaver.saveAs(pathway, "pathway.xml");
  }

}
