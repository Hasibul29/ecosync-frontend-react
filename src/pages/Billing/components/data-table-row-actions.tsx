import { DownloadIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/custom/button";
import { Billing } from "@/hooks/useBilling";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface DataTableRowActionsProps {
  row: Row<Billing>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const onDownloadPressed = async () => {
    console.log(row.original);
    const fileName = "test.pdf";
    const blob = await pdf(<Receipt data={row.original} />).toBlob();
    saveAs(blob, fileName);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => onDownloadPressed()}
      >
        <DownloadIcon className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#F4F4F4",
  },
  container: {
    maxWidth: 600,
    backgroundColor: "#FFF",
    padding: 20,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
  },
  tableLabel: {
    fontSize: 12,
    fontWeight: 400,
    width: "50%",
    textAlign: "left",
  },
  tableData: {
    fontSize: 12,
    fontWeight: 400,
    width: "50%",
  },
});

const Receipt = ({ data }: { data: Billing }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.heading}>RECEIPT</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>ID:</Text>
            <Text style={styles.tableData}>{data.id}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Generated Time:</Text>
            <Text style={styles.tableData}>
              {new Date(data.generatedTimeStamp).toLocaleString()}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Vehicle Number:</Text>
            <Text style={styles.tableData}>{data.vehicleNumber}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Landfill Name:</Text>
            <Text style={styles.tableData}>{data.landfillName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>STS Name:</Text>
            <Text style={styles.tableData}>{data.stsName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Waste Volume:</Text>
            <Text style={styles.tableData}>{data.wasteVolume}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Fuel Cost:</Text>
            <Text style={styles.tableData}>{data.fuelCost}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
