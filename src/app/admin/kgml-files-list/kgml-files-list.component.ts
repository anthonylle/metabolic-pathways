import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { KgmlFilesService } from '../kgml-files.service';
import { MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { HostListener } from '@angular/core';

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
  fileUpload() {
    console.log(this.el);
    // Access the uploaded file through the ElementRef
    this.uploadedFile = this.el.nativeElement.files[0];
    console.log(this.uploadedFile);
    console.log(this.service.uploadKGMLFileToDB('http://localhost:3000/api/upload', this.uploadedFile));
  }



  @HostListener("click")onClick(){
    console.log("User Click using Host Listener")
  }



}
