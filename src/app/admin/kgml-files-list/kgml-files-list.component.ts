import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { KgmlFilesService } from './kgml-files.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-kgml-files-list',
  templateUrl: './kgml-files-list.component.html',
  styleUrls: ['./kgml-files-list.component.css'],
  providers: [KgmlFilesService]
})
export class KgmlFilesListComponent implements OnInit {

  @ViewChild('fileInput') el:ElementRef;
  constructor(private service: KgmlFilesService) { }

  uploadedFile: any = null;
  file: any;
  files: any = [];
  filesData: MatTableDataSource<any>;
  displayedColumns: string[] = ['File Name', 'Upload Date', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getAllKGMLFiles().subscribe(files => {
      console.log("2");
      this.files = files;
      this.filesData = new MatTableDataSource<any>(files as
      {_id: string, length: number, chunkSize: number, uploadDate: string, filename: string, md5: string, contentType: string}[]);
      this.filesData.sort = this.sort;
      this.filesData.paginator = this.paginator;
    });
  }
  fileUpload() {
    console.log(this.el);
    // Access the uploaded file through the ElementRef
    this.uploadedFile = this.el.nativeElement.files[0];
    console.log(this.uploadedFile);
    console.log(this.service.uploadKGMLFileToDB('http://localhost:3000/api/upload', this.uploadedFile));
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
